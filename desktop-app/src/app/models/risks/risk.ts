import { ActiveListDto } from "../actives/actives"
import { ShowUser } from "../user/show-user"
import { VulnListDto } from "../vulns/vuln"
import { RiskCalcShowDto, RiskCalcUpdateDto } from "./risk_calc"
import { RiskSfgShowDto, RiskSfgUpdateDto } from "./risk_sfg"

export class RiskListDto {

    constructor(
        id: number,
        code: number,
        name: string,
        description: string,
        creationDate: Date,
        createdBy: ShowUser,
        lastModification: Date,
        modifiedBy: ShowUser,
        assignedActive: ActiveListDto,
        assignedVuln: VulnListDto,
        riskType: string,
        totalWoSfg: number,
        total: number
    ) {
        this.id = id
        this.code = code
        this.name = name
        this.description = description
        this.creationDate = creationDate
        this.createdBy = createdBy
        this.lastModification = lastModification
        this.modifiedBy = modifiedBy
        this.assignedActive = assignedActive
        this.assignedVuln = assignedVuln
        this.riskType = riskType
        this.totalWoSfg = totalWoSfg
        this.total = total
    }

    id: number
    code: number
    name: string
    description: string
    creationDate: Date
    createdBy: ShowUser
    lastModification: Date
    modifiedBy: ShowUser
    assignedActive: ActiveListDto
    assignedVuln: VulnListDto
    riskType: string
    totalWoSfg: number
    total: number
}

export class RiskShowDto extends RiskListDto {

    constructor(
        id: number,
        code: number,
        name: string,
        description: string,
        creationDate: Date,
        createdBy: ShowUser,
        lastModification: Date,
        modifiedBy: ShowUser,
        assignedActive: ActiveListDto,
        assignedVuln: VulnListDto,
        riskType: string,
        totalWoSfg: number,
        total: number,
        riskCalc: Array<RiskCalcShowDto>,
        riskSfg: Array<RiskSfgShowDto>
    ) {
        super(id, code, name, description, creationDate, createdBy, lastModification, modifiedBy, assignedActive, assignedVuln, riskType, totalWoSfg, total)
        this.riskCalc = riskCalc
        this.riskSfg = riskSfg
    }

    riskCalc: Array<RiskCalcShowDto>
    riskSfg: Array<RiskSfgShowDto>
}

export class RiskSearchDto {

    constructor(
        code: number,
        name: string,
        description: string,
        creationDate: Date,
        createdBy: string,
        lastModification: Date,
        modifiedBy: string,
        riskType: string,
        totalWoSfg: number,
        total: number
    ) {
        this.code = code
        this.name = name
        this.description = description
        this.creationDate = creationDate
        this.createdBy = createdBy
        this.lastModification = lastModification
        this.modifiedBy = modifiedBy
        this.riskType = riskType
        this.totalWoSfg = totalWoSfg
        this.total = total
    }

    code: number
    name: string
    description: string
    creationDate: Date
    createdBy: string
    lastModification: Date
    modifiedBy: string
    riskType: string
    totalWoSfg: number
    total: number
}

export class RiskCreateDto {

    constructor(
        name: string,
        description: string,
        activeId: number,
        vulnId: number,
        riskType: string,
        riskCalc: Array<RiskCalcUpdateDto>,
        riskSfg: Array<RiskSfgUpdateDto>
    ) {
        this.name = name
        this.description = description
        this.activeId = activeId
        this.vulnId = vulnId
        this.riskType = riskType
        this.riskCalc = riskCalc
        this.riskSfg = riskSfg
    }

    name: string
    description: string
    activeId: number
    vulnId: number
    riskType: string
    riskCalc: Array<RiskCalcUpdateDto>
    riskSfg: Array<RiskSfgUpdateDto>
}

export class RiskUpdateDto extends RiskCreateDto {

    constructor(
        id: number,
        name: string,
        description: string,
        activeId: number,
        vulnId: number,
        riskType: string,
        riskCalc: Array<RiskCalcUpdateDto>,
        riskSfg: Array<RiskSfgUpdateDto>
    ) {
        super(name, description, activeId, vulnId, riskType, riskCalc, riskSfg)
        this.id = id
    }

    id: number
}