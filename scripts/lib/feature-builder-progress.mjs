// Infer the merged worker's phase from per-feature artifacts, never just one file.
export function featureBuilderProgress({ expected = [], profiles = [], checklists = [], hasKb = false }) {
  const targets = [...new Set([...expected, ...profiles, ...checklists])];
  const profileSet = new Set(profiles), checklistSet = new Set(checklists);
  const missingProfiles = targets.filter(name => !profileSet.has(name));
  const missingChecklists = targets.filter(name => !checklistSet.has(name));
  const phase = !hasKb && !targets.length ? 'idle' : !targets.length || missingProfiles.length ? 'profile' : missingChecklists.length ? 'checklist' : 'done';
  return { phase, missingProfiles, missingChecklists };
}
