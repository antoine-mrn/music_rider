export function getPaginationMeta(
  totalBands: number,
  page: number,
  limit: number,
) {
  const totalPages = Math.ceil(totalBands / limit);

  return {
    total: totalBands,
    page,
    limit,
    totalPages,
    hasNextPage: page < totalPages,
    hasPreviousPage: page > 1,
  };
}
