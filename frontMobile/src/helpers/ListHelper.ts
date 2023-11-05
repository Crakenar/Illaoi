export function transformDataForDropdownList(data: any[]) {
  return data.map((item) => {
    return {
      id: item.id,
      label: item.label,
    }
  })
}