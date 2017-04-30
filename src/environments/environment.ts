// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

const BASE_URL = "https://localhost:6530/api/";

export const SERVICE_LOCATIONS: any = [
  { provide: "TreeLocationServiceUrl", useValue: BASE_URL + "treeLocation" }

];

export const environment = { production: false };
