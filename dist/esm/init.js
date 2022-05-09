import fs from "fs";
export default function init() {
    if (!fs.existsSync(dbRootPath)) {
        fs.mkdirSync(dbRootPath, { recursive: true });
    }
}
