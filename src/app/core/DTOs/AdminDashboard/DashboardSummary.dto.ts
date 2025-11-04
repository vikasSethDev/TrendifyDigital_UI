import { KpiSummaryDTO } from './KpiSummary.dto';
import { EnrollmentTrendDTO } from './EnrollmentTrend.dto';
import { PaymentOverviewDTO } from './PaymentOverview.dto';

export interface DashboardSummaryDTO {
    summary: KpiSummaryDTO;
    charts: {
        enrollmentTrend: EnrollmentTrendDTO;
        paymentOverview: PaymentOverviewDTO;
    };
    filter: {
        year: number;
        month: number;
    };
    viewType: string;
}
