import crypto from "crypto";

export function sha256(password:string): string {
    const hash: crypto.Hash = crypto.createHash("sha256");
    hash.update(password);
    return hash.digest("hex");
};


export function createLink(){
  const link = crypto.randomBytes(32).toString('hex');
  return link;
};