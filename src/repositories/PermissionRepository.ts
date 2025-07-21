import { Permission } from "../entities";
import { BaseRepository } from "./baseRepository";

export class PermissionRepository extends BaseRepository<Permission> {
  constructor() {
    super(Permission);
  }
}
