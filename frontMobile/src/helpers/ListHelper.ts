export function transformDataForDropdownList(data: any[]) {
  return data.map((item) => {
    return {
      id: item.id,
      label: item.label,
    }
  })
}

export function jsonStringToArray(jsonStringArray: Array<string>) {
  return jsonStringArray.map(str=> JSON.parse(str));
}