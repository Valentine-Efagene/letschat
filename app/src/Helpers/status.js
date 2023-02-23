const statusNames = {
  draft: 'Draft',
  pending_approval: 'Pending',
  approved: 'Approved',
  cancelled: 'Cancelled',
  declined: 'Declined',
  published: 'Published',
};

const statusIcons = {
  draft: '/assets/ic_outline-pending.svg',
  pending_approval: '/assets/ic_outline-pending.svg',
  approved: '/assets/check_fill.svg',
  published: '/assets/check_fill.svg',
  cancelled: '/assets/dell_light.svg',
  declined: '/assets/dell_light.svg',
};

export { statusNames, statusIcons };
