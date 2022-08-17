package com.iman.repository.vulns;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.iman.model.vulnerability.VulnLib;

@Repository
public interface VulnLibRepository extends JpaRepository<VulnLib, Long>{
	
//	@Query(value = "SELECT vl FROM VulnLib vl where vl.active=true and (vl.standard or vl.project.id=:projectId) and vl.name like :name")
//	public Page<VulnLib> findVulnLib63(@Param("name") String name, @Param("projectId") Long projectId, Pageable pageable);
    
	@Query(value = "SELECT vl FROM VulnLib vl WHERE vl.active=true AND (vl.standard=true OR vl.project.id=:projectId) "
			+ "AND vl.name like %:name% AND vl.company like %:company% "
			+ "AND vl.product like %:product% AND vl.affectedVersions like %:affectedVersions% "
			+ "AND vl.cweType like %:cweType% AND vl.lang like %:lang%")
	Page<VulnLib> findByNameAndProjectId(@Param("projectId") Long projectId, 
			@Param("name") String name, @Param("company") String company, 
			@Param("product") String product, @Param("affectedVersions") String affectedVersions,
			@Param("cweType") String cweType, @Param("lang") String lang,
			Pageable pageable);
    
	
//	@Query(value = "select * from vulnlib where active=true and (standard=true or project_id=1) "
//			+ "and name like '%%' and company like '%%' and product like '%%' "
//			+ "and affected_versions like '%%' and cwe_type like '%%' "
//			+ "and lang like '%%' and cvss like '%%' and cvss_vector like '%%'",
//			nativeQuery = true)
//	Page<VulnLib> findByNameAndProjectId(@Param("name") String name, @Param("projectId") Long projectId, Pageable pageable);
    
}
