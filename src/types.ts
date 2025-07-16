interface ModuleDependency {
  dynamic: boolean;
  module: string;
  moduleSystem: string;
  exoticallyRequired: boolean;
  dependencyTypes: string[];
  resolved: string;
  coreModule: boolean;
  followable: boolean;
  couldNotResolve: boolean;
  matchesDoNotFollow: boolean;
  circular: boolean;
  valid: boolean;
}

interface Module {
  source: string;
  dependencies: ModuleDependency[];
}

interface Violation {
  type: string;
  from: string;
  to: string;
  rule: { severity: string; name: string };
}

interface Result {
  modules: Module[];
  violations: Violation[];
}

export type { ModuleDependency, Module, Violation, Result };
