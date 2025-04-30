export function getDefaultExport(mod: any) {
  return mod && mod.default ? getDefaultExport(mod.default) : mod;
}
