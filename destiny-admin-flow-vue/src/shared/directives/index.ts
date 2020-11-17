import * as permission from "./permission";

const directives = new Map();

for (const key of Object.keys(permission)) {
    directives.set(key, (permission as any)[key]);
}


export default directives;