interface ContactWithUserBand {
  firstname: string | null;
  lastname: string | null;
  email: string | null;
  phone: string | null;
  userBand?: {
    user?: {
      firstname: string | null;
      lastname: string | null;
      email: string | null;
      phone: string | null;
    } | null;
  } | null;
}

export function getContactField(
  contact: ContactWithUserBand,
  field: 'firstname' | 'lastname' | 'email' | 'phone',
): string {
  return contact.userBand?.user?.[field] ?? contact[field] ?? '';
}
