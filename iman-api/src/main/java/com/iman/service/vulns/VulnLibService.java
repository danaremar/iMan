package com.iman.service.vulns;

import java.util.Date;
import java.util.Optional;

import javax.ws.rs.NotAllowedException;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.ExampleMatcher;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.iman.model.projects.Project;
import com.iman.model.vulnerability.VulnLib;
import com.iman.model.vulnerability.VulnLibCreateDto;
import com.iman.model.vulnerability.VulnLibListDto;
import com.iman.model.vulnerability.VulnLibSearchDto;
import com.iman.model.vulnerability.VulnLibShowDto;
import com.iman.model.vulnerability.VulnLibUpdateDto;
import com.iman.repository.vulns.VulnLibRepository;
import com.iman.service.projects.ProjectService;

@Service
public class VulnLibService {

    @Autowired
    private VulnLibRepository vulnLibRepository;

    @Autowired
    private ProjectService projectService;

    @Autowired(required = true)
    protected ModelMapper modelMapper;

    /*
     * AUX
     * 
     */
    public VulnLibListDto mapVulnLibToList(VulnLib vl) {
        return modelMapper.map(vl, VulnLibListDto.class);
    }

    public Page<VulnLibListDto> mapPageToPageDto(Page<VulnLib> vl) {
        return vl.map(this::mapVulnLibToList);
    }

    public VulnLib findVulnLibById(Long id) {
        VulnLib exampleVulnLib = new VulnLib();
        exampleVulnLib.setId(id);
        exampleVulnLib.setActive(true);
        Example<VulnLib> example = Example.of(exampleVulnLib);
        return vulnLibRepository.findOne(example).orElseThrow();
    }

    /*
     * FIND BY FILTER, SORTING & PAGING
     * 
     */
    
    public Page<VulnLibListDto> findStandardVulnLib(VulnLibSearchDto vulnLibSearchDto, Pageable pageable) {

        // Example
        VulnLib vl = modelMapper.map(vulnLibSearchDto, VulnLib.class);
        vl.setActive(true);
        vl.setStandard(true);

        // Matcher & example
        ExampleMatcher matcher = ExampleMatcher.matching()
                .withIgnoreCase()
                .withStringMatcher(ExampleMatcher.StringMatcher.CONTAINING);
        Example<VulnLib> example = Example.of(vl, matcher);

        // Find
        Page<VulnLib> vulnLibPage = vulnLibRepository.findAll(example, pageable);
        return mapPageToPageDto(vulnLibPage);
    }
    
    
    public Page<VulnLibListDto> findVulnLib(VulnLibSearchDto vulnLibSearchDto, Long projectId, Pageable pageable) {

    	// Permissions
        Project project = projectService.findProjectById(projectId);
            projectService.verifyMember(project);
        
        // Find -> manual JPQL sentence (cannot be project o standard)
        Page<VulnLib> vulnLibPage = vulnLibRepository.findByNameAndProjectId(project==null?0:project.getId(),
        		Optional.ofNullable(vulnLibSearchDto.getName()).orElse(""),Optional.ofNullable(vulnLibSearchDto.getCompany()).orElse(""),
        		Optional.ofNullable(vulnLibSearchDto.getProduct()).orElse(""),Optional.ofNullable(vulnLibSearchDto.getAffectedVersions()).orElse(""),
        		Optional.ofNullable(vulnLibSearchDto.getCweType()).orElse(""),Optional.ofNullable(vulnLibSearchDto.getLang()).orElse(""),
        		pageable);
        return mapPageToPageDto(vulnLibPage);
    }
    

    /*
     * SHOW
     * 
     */
    public VulnLib findVerifiedVulnLib(Long vulnLibId) {
        VulnLib vulnLib = findVulnLibById(vulnLibId);
        if (!vulnLib.getStandard()) {
            projectService.verifyUserRelatedWithProject(vulnLib.getProject());
        }
        return vulnLib;
    }

    public VulnLibShowDto findVerifiedVulnLibShowById(Long vulnLibId) {
        VulnLib vulnLib = findVerifiedVulnLib(vulnLibId);
        return modelMapper.map(vulnLib, VulnLibShowDto.class);
    }

    /*
     * CREATE
     * 
     */
    @Transactional
    public VulnLibShowDto createVulnLib(VulnLibCreateDto vulnLibCreateDto, Long projectId) {

        // Permissions
        Project project = projectService.findProjectById(projectId);
        projectService.verifyMember(project);

        // Creation
        VulnLib vl = modelMapper.map(vulnLibCreateDto, VulnLib.class);
        vl.setActive(true);
        vl.setCvssManual(true);
        vl.setProject(project);
        vl.setStandard(false);
        vl.setCreationDate(new Date());
        vl.setModificationDate(new Date());
        vl.setLang("EN-US");

        // Save
        VulnLib v = vulnLibRepository.save(vl);
        return modelMapper.map(v, VulnLibShowDto.class);
    }

    /*
     * UPDATE
     * 
     */
    public void verifyEditVulnLib(VulnLib vulnLib) {
        if (!vulnLib.getStandard()) {
            projectService.verifyMember(vulnLib.getProject());
        } else {
            throw new NotAllowedException("Standard vulnerability cannot be edited");
        }
    }

    @Transactional
    public VulnLibShowDto updateVulnLib(VulnLibUpdateDto vulnLibUpdateDto) {

        // Get previous vulnLib
        VulnLib oldVl = findVulnLibById(vulnLibUpdateDto.getId());

        // Permissions
        verifyEditVulnLib(oldVl);

        // Update & fetch from previous
        VulnLib newVl = modelMapper.map(vulnLibUpdateDto, VulnLib.class);
        newVl.setActive(true);
        newVl.setCvssManual(true);
        newVl.setStandard(false);
        newVl.setProject(oldVl.getProject());
        newVl.setCreationDate(oldVl.getCreationDate());
        newVl.setModificationDate(new Date());
        newVl.setLang("EN-US");

        // Save
        VulnLib v = vulnLibRepository.save(newVl);
        return modelMapper.map(v, VulnLibShowDto.class);
    }

    /*
     * DISABLE -> Set no active
     * 
     */
    @Transactional
    public void disableVulnLib(Long vulnLibId) {

        // Get previous vulnLib
        VulnLib vl = findVulnLibById(vulnLibId);

        // Permissions
        verifyEditVulnLib(vl);

        // Update
        vl.setActive(false);
        vl.setModificationDate(new Date());

        // Save
        vulnLibRepository.save(vl);
    }

}
