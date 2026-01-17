export enum SponsorTier {
  DIAMOND = "diamond",
  GOLD = "gold",
  SILVER = "silver",
}

export const SPONSOR_TIER_ORDER: SponsorTier[] = [
  SponsorTier.DIAMOND,
  SponsorTier.GOLD,
  SponsorTier.SILVER,
]

export enum ExecutiveTeam {
  PRESIDENT = "president",
  ADMIN = "admin",
  EVENTS = "events",
  MARKETING = "marketing",
  TECH_EDU = "tech-edu",
  DESIGN = "design",
}

export enum ExecutiveLevel {
  PRESIDENT = "president",
  DIRECTOR = "director",
  SENIOR_ADVISOR = "senior-advisor",
  ADMIN = "admin",
  EXECUTIVE = "executive",
}

export const EXECUTIVE_LEVEL_ORDER: ExecutiveLevel[] = [
  ExecutiveLevel.PRESIDENT,
  ExecutiveLevel.DIRECTOR,
  ExecutiveLevel.SENIOR_ADVISOR,
  ExecutiveLevel.ADMIN,
  ExecutiveLevel.EXECUTIVE,
]
