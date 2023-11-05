export function transformDataForDropdownList(data: any[]) {
  return data?.map((item) => {
    return {
      id: item.id,
      label: item.label,
    };
  });
}

export function jsonStringToArray(jsonStringArray: Array<string>) {
  if (jsonStringArray) {
    return jsonStringArray?.map((str) => JSON.parse(str));
  } else {
    return [];
  }
}

export function getUniquesValuesFromAnotherArray(array: any[], key: string) {
  return array
    .map((item) => item[key])
    .filter((value, index, self) => self.indexOf(value) === index);
}

export function getIdsFromArray(array: any[]) {
  return array.map((item) => item.id);
}

export function idExistInArray(array: any[], id: number) {
  return array.some(item => item.id === id);
}
