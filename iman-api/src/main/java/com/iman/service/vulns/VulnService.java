package com.iman.service.vulns;

import java.nio.file.AccessDeniedException;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import org.apache.commons.lang3.StringUtils;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.ExampleMatcher;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.iman.model.actives.Active;
import com.iman.model.projects.Project;
import com.iman.model.users.User;
import com.iman.model.vulnerability.Vuln;
import com.iman.model.vulnerability.VulnCreateDto;
import com.iman.model.vulnerability.VulnLib;
import com.iman.model.vulnerability.VulnListDto;
import com.iman.model.vulnerability.VulnSearchDto;
import com.iman.model.vulnerability.VulnShowDto;
import com.iman.model.vulnerability.VulnUpdateDto;
import com.iman.repository.vulns.VulnRepository;
import com.iman.service.actives.ActiveService;
import com.iman.service.projects.ProjectService;
import com.iman.service.users.UserService;

@Service
public class VulnService {

    @Autowired
    private VulnRepository vulnRepository;

    @Autowired
    private ProjectService projectService;

    @Autowired
    private UserService userService;

    @Autowired
    private ActiveService activeService;

    @Autowired
    private VulnLibService vulnLibService;

    @Autowired(required = true)
    protected ModelMapper modelMapper;

    /*
     * AUX
     * 
     */

    VulnListDto mapVulnToList(Vuln v) {
        return modelMapper.map(v, VulnListDto.class);
    }

    Page<VulnListDto> mapPagetoPageDto(Page<Vuln> v) {
        return v.map(this::mapVulnToList);
    }

    List<VulnLib> vulnLibIdsToVulnLibs(List<Long> ls) {
        return ls.stream()
                .map(x -> vulnLibService.findVerifiedVulnLib(x))
                .collect(Collectors.toList());
    }

    Vuln findVulnById(Long id) {
        Vuln exampleVuln = new Vuln();
        exampleVuln.setId(id);
        exampleVuln.setActive(true);
        Example<Vuln> example = Example.of(exampleVuln);
        return vulnRepository.findOne(example).orElseThrow();
    }

    public Long countVulnsInProject(Project project) {
        Vuln exampleVuln = new Vuln();
        exampleVuln.setProject(project);
        Example<Vuln> example = Example.of(exampleVuln);
        return vulnRepository.count(example);
    }

    /*
     * FIND BY FILTER, SORTING & PAGING
     * 
     */

    public Page<VulnListDto> findVulns(VulnSearchDto vulnSearchDto, Long projectId, Pageable pageable) {

        // Permisisions
        Project project = projectService.findProjectById(projectId);
        projectService.verifyUserRelatedWithProject(project);

        // Matcher & example
        Vuln vuln = modelMapper.map(vulnSearchDto, Vuln.class);
        if (!StringUtils.isEmpty(vulnSearchDto.getCreatedBy())) {
            User user = new User();
            user.setUsername(vulnSearchDto.getCreatedBy());
            vuln.setCreatedBy(user);
        }
        if (vulnSearchDto.getActiveCode() != null && vulnSearchDto.getActiveCode() != 0) {
            Active active = new Active();
            active.setProject(project);
            active.setCode(vulnSearchDto.getActiveCode());
            vuln.setRelActive(active);
        }
        vuln.setProject(project);
        vuln.setActive(true);
        ExampleMatcher matcher = ExampleMatcher.matching().withIgnoreCase()
                .withStringMatcher(ExampleMatcher.StringMatcher.CONTAINING);
        Example<Vuln> example = Example.of(vuln, matcher);

        // Find
        Page<Vuln> vulnPage = vulnRepository.findAll(example, pageable);
        return mapPagetoPageDto(vulnPage);
    }

    /*
     * SHOW
     * 
     */
    public Vuln findVerifiedVulnById(Long vulnId) {
        Vuln vuln = findVulnById(vulnId);
        projectService.verifyUserRelatedWithProject(vuln.getProject());
        return vuln;
    }

    public VulnShowDto findVerifiedVulnShowById(Long vulnId) {
        Vuln vuln = findVerifiedVulnById(vulnId);
        return modelMapper.map(vuln, VulnShowDto.class);
    }

    /*
     * CREATE
     * 
     */
    
    

    @Transactional
    public VulnShowDto createVuln(VulnCreateDto vulnCreateDto, Long projectId) throws AccessDeniedException {

        // Permissions
        Project project = projectService.findProjectById(projectId);
        projectService.verifyOwnerOrAdmin(project);
        
        // Properties not allowed to map
        Active active = vulnCreateDto.getRelActiveId()!=null?activeService.findActiveById(vulnCreateDto.getRelActiveId()):null;
        if(active!=null && !active.getProject().getId().equals(project.getId())){
            throw new AccessDeniedException("Cannot be added actives from another project");
        }
        vulnCreateDto.setRelActiveId(null);
        List<VulnLib> vulnLibIdLs = vulnLibIdsToVulnLibs(vulnCreateDto.getVulnlibIdLs());
        vulnCreateDto.setVulnlibIdLs(null);

        // Creation
        Vuln v = modelMapper.map(vulnCreateDto, Vuln.class);
        v.setCode(countVulnsInProject(project) + 1);
        v.setActive(true);
        v.setProject(project);
        v.setCreationDate(new Date());
        v.setCreatedBy(userService.getCurrentUser());
        v.setRelActive(active);
        v.setVulnlib(vulnLibIdLs);

        // Save
        Vuln a = vulnRepository.save(v);
        return modelMapper.map(a, VulnShowDto.class);
    }

    /*
     * UPDATE
     * 
     */

    @Transactional
    public VulnShowDto updateVuln(VulnUpdateDto vulnUpdateDto) throws AccessDeniedException {

        // Get previous vuln
        Vuln oldVuln = findVulnById(vulnUpdateDto.getId());

        // Permissions
        projectService.verifyOwnerOrAdmin(oldVuln.getProject());

        // Properties not allowed to map
        Active active = vulnUpdateDto.getRelActiveId()!=null?activeService.findActiveById(vulnUpdateDto.getRelActiveId()):null;
        if(active!=null && !active.getProject().getId().equals(oldVuln.getProject().getId())){
            throw new AccessDeniedException("Cannot be added actives from another project");
        }
        vulnUpdateDto.setRelActiveId(null);
        List<VulnLib> vulnLibIdLs = vulnLibIdsToVulnLibs(vulnUpdateDto.getVulnlibIdLs());
        vulnUpdateDto.setVulnlibIdLs(null);

        // Update & fetch from previous
        Vuln newVuln = modelMapper.map(vulnUpdateDto, Vuln.class);
        newVuln.setCode(oldVuln.getCode());
        newVuln.setActive(true);
        newVuln.setProject(oldVuln.getProject());
        newVuln.setCreationDate(new Date());
        newVuln.setCreatedBy(userService.getCurrentUser());
        newVuln.setRelActive(active);
        newVuln.setVulnlib(vulnLibIdLs);

        // Save
        Vuln a = vulnRepository.save(newVuln);
        return modelMapper.map(a, VulnShowDto.class);
    }

    /*
     * DISABLE -> Set no active
     * 
     */

    public void disableVuln(Long vulnId) {

        // Get previous vuln
        Vuln v = findVulnById(vulnId);

        // Permissions
        projectService.verifyOwnerOrAdmin(v.getProject());

        // Update
        v.setActive(false);

        // Save
        vulnRepository.save(v);

    }

}
