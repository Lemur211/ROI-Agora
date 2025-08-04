const CalculationTemplate = { // high key probably not needed but it works so leaving it lol 

    calculate: function(inputs) {
        const before = {
            leadsCalledPerMonth: inputs.leadsCalledPerMonth,
            closePercent: inputs.closePercentBefore,
            dealsClosedPerMonth: Math.round((inputs.leadsCalledPerMonth * inputs.closePercentBefore) / 100),
            revenue: Math.round((inputs.leadsCalledPerMonth * inputs.closePercentBefore / 100) * inputs.revenuePerItemSold),
            cogs: Math.round((inputs.leadsCalledPerMonth * inputs.closePercentBefore / 100) * inputs.costPerUnit),
            commissionExpense: Math.round((inputs.leadsCalledPerMonth * inputs.closePercentBefore / 100) * inputs.revenuePerItemSold * (inputs.commissionPerSale / 100)),
            agoraSubscription: 0,
            otherCosts: inputs.otherCostsBefore
        };
        const after = {
            leadsCalledPerMonth: inputs.leadsCalledPerMonth * 1.2,
            closePercent: inputs.closePercentAfter,
            dealsClosedPerMonth: Math.round((inputs.leadsCalledPerMonth * 1.2 * inputs.closePercentAfter) / 100),
            revenue: Math.round((inputs.leadsCalledPerMonth * 1.2 * inputs.closePercentAfter / 100) * inputs.revenuePerItemSold),
            cogs: Math.round((inputs.leadsCalledPerMonth * 1.2 * inputs.closePercentAfter / 100) * inputs.costPerUnit),
            commissionExpense: Math.round((inputs.leadsCalledPerMonth * 1.2 * inputs.closePercentAfter / 100) * inputs.revenuePerItemSold * (inputs.commissionPerSale / 100)),
            agoraSubscription: inputs.agoraSubscriptionMonthly,
            otherCosts: inputs.otherCostsAfter
        };
        before.grossProfit = before.revenue - before.cogs;
        before.grossMargin = before.revenue > 0 ? (before.grossProfit / before.revenue) : 0;
        before.totalOperatingExpenses = before.commissionExpense + before.agoraSubscription + before.otherCosts;
        before.netIncome = before.grossProfit - before.totalOperatingExpenses;

        after.grossProfit = after.revenue - after.cogs;
        after.grossMargin = after.revenue > 0 ? (after.grossProfit / after.revenue) : 0;
        after.totalOperatingExpenses = after.commissionExpense + after.agoraSubscription + after.otherCosts;
        after.netIncome = after.grossProfit - after.totalOperatingExpenses;
        const netIncomeImprovement = before.netIncome !== 0 ? 
            ((after.netIncome - before.netIncome) / Math.abs(before.netIncome)) * 100 : 0;

        return { 
            before, 
            after, 
            netIncomeImprovement,
            monthlyIncrease: after.netIncome - before.netIncome,
            annualIncrease: (after.netIncome - before.netIncome) * 12
        };
    },
    formatNumber: function(num) {
        return new Intl.NumberFormat().format(Math.round(num));
    },

    formatPercent: function(num) {
        return `${(num * 100).toFixed(1)}%`;
    },

    formatCurrency: function(num) {
        return `$${this.formatNumber(num)}`;
    }
};