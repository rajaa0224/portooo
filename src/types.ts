export type ProjectStatus = 'in_progress' | 'completed'

/** A single hardware component / material line in the Bill of Materials. */
export interface BomItem {
  component: string
  quantity: string
  notes?: string
}

export interface Project {
  id: string
  title: string
  slug: string
  /** Short one-liner used on cards and in the modal. */
  summary: string
  /** The problem the device solves (shown in the modal). */
  problem: string
  /** Full background + how it works (detail page). */
  full_description: string
  /** Technology badges, e.g. ["C++", "ESP32"]. */
  tech: string[]
  image_url: string | null
  status: ProjectStatus
  /** Lab stage label while in progress, e.g. "Hardware Assembly". */
  lab_stage: string | null
  /** Completion percentage 0-100 for the "In The Lab" progress bar. */
  progress: number
  /** Target / actual completion date (ISO yyyy-mm-dd). */
  completion_date: string | null
  bom: BomItem[]
  schematic_url: string | null
  source_code_url: string | null
  /** Notes on program logic for the detail page. */
  code_notes: string | null
  sort_order: number
  created_at: string
}

/** Shape used when creating/editing in the admin form (no server-managed fields). */
export type ProjectInput = Omit<Project, 'id' | 'created_at'>
