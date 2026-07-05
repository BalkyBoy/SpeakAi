import { Controller, Get, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../auth/guard/jwt-auth.guard";
import { DashboardService } from "./dashboard.service";
import { CurrentUser } from "src/common/decorators";
import type { User } from "@prisma/client";

@Controller('dashboard')
@UseGuards(JwtAuthGuard)
export class DashboardController {
    constructor(private readonly dashboardService: DashboardService) { }

    @Get()
    getDashboardData(@CurrentUser() user: User) {
        console.log('user', user);
        return this.dashboardService.getDashboardData(user.id);
    }
 }