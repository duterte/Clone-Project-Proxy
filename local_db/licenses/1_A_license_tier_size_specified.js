module.exports = {
  _links: {
    self: {
      href:
        '/rest/2/vendors/27437/reporting/licenses?text=SEN-21879901&withDataInsights=true',
    },
    query: {
      href:
        '/rest/2/vendors/27437/reporting/licenses{?addon*,startDate,endDate,text,tier*,dateType,licenseType*,partnerType*,hosting*,status*,withAttribution,withDataInsights,lastUpdated,sortBy,order,offset,limit}',
      templated: true,
    },
    export: [
      {
        href:
          '/rest/2/vendors/27437/reporting/licenses/export?accept=csv&text=SEN-21879901&withDataInsights=true',
        type: 'text/csv',
      },
      {
        href:
          '/rest/2/vendors/27437/reporting/licenses/export?accept=json&text=SEN-21879901&withDataInsights=true',
        type: 'application/json',
      },
    ],
  },
  licenses: [
    {
      addonLicenseId: '21879901',
      licenseId: 'SEN-21879901',
      addonKey: 'com.stiltsoft.confluence.quiz',
      addonName: 'izi - LMS for Confluence - Courses & Quizzes',
      hosting: 'Server',
      lastUpdated: '2021-03-17',
      licenseType: 'COMMERCIAL',
      maintenanceStartDate: '2021-04-06',
      maintenanceEndDate: '2022-04-06',
      status: 'active',
      tier: '2000 Users',
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
          state: 'XXXXXXXXXXXXXXXXXXXXXXX',
          postcode: 'XXXXXXXXXXXXXXXXXXXXXXX',
        },
        billingContact: {
          email: 'XXXXXXXXXXXXXXXXXXXXXXX',
          name: 'XXXXXXXXXXXXXXXXXXXXXXX',
          phone: 'XXXXXXXXXXXXXXXXXXXXXXX',
          address1: 'XXXXXXXXXXXXXXXXXXXXXXX',
          city: 'XXXXXXXXXXXXXXXXXXXXXXX',
          state: 'XXXXXXXXXXXXXXXXXXXXXXX',
          postcode: 'XXXXXXXXXXXXXXXXXXXXXXX',
        },
      },
      evaluationOpportunitySize: 'NA',
    },
  ],
};
