module.exports = {
  _links: {
    self: {
      href:
        '/rest/2/vendors/27437/reporting/licenses?text=SEN-L16990362&withDataInsights=true',
    },
    query: {
      href:
        '/rest/2/vendors/27437/reporting/licenses{?addon*,startDate,endDate,text,tier*,dateType,licenseType*,partnerType*,hosting*,status*,withAttribution,withDataInsights,lastUpdated,sortBy,order,offset,limit}',
      templated: true,
    },
    export: [
      {
        href:
          '/rest/2/vendors/27437/reporting/licenses/export?accept=csv&text=SEN-L16990362&withDataInsights=true',
        type: 'text/csv',
      },
      {
        href:
          '/rest/2/vendors/27437/reporting/licenses/export?accept=json&text=SEN-L16990362&withDataInsights=true',
        type: 'application/json',
      },
    ],
  },
  licenses: [
    {
      addonLicenseId: 'L16990362',
      licenseId: 'SEN-L16990362',
      addonKey: 'com.stiltsoft.confluence.plugin.tablefilter.tablefilter',
      addonName: 'Table Filter and Charts for Confluence',
      hosting: 'Server',
      lastUpdated: '2021-03-26',
      licenseType: 'EVALUATION',
      maintenanceStartDate: '2021-03-25',
      maintenanceEndDate: '2021-04-24',
      status: 'active',
      tier: 'Evaluation',
      contactDetails: {
        company: 'XXXXXXXXXXXXXXXXXXXXXXX',
        country: 'XXXXXXXXXXXXXXXXXXXXXXX',
        region: 'XXXXXXXXXXXXXXXXXXXXXXX',
        technicalContact: {
          email: 'XXXXXXXXXXXXXXXXXXXXXXX',
          name: 'XXXXXXXXXXXXXXXXXXXXXXX',
          phone: 'XXXXXXXXXXXXXXXXXXXXXXX',
          address1: 'XXXXXXXXXXXXXXXXXXXXXXX',
          city: 'XXXXXXXXXXXXXXXXXXXXXXX',
          postcode: 'XXXXXXXXXXXXXXXXXXXXXXX',
        },
      },
      evaluationOpportunitySize: 'NA',
    },
  ],
};
