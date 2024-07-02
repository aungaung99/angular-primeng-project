const ADMIN: string[] = ['admin'];
const ADMIN_COMPANY: string[] = ['admin', 'company'];
const ADMIN_COMPANY_MANAGER: string[] = ['admin', 'company', 'manager'];

export const NAVIGATION_MENU: Readonly<any[]> = [
  {
    label: 'Home',
    items: [
      { label: 'Dashboard', icon: 'pi pi-fw pi-chart-pie', routerLink: ['/dashboard'], data: { role: ADMIN_COMPANY_MANAGER }, readonly: true },
      {
        label: 'Master', icon: 'pi pi-fw pi-database',
        items: [
          { label: 'Rule', routerLink: ['/master/rule'], data: { role: ADMIN_COMPANY_MANAGER } }
        ],
        data: { role: ADMIN_COMPANY_MANAGER },
        readonly: true
      },
    ],
    data: { role: ADMIN_COMPANY_MANAGER }
  }
];
