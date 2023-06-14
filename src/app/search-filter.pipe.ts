import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchFilter',
})
export class SearchFilterPipe implements PipeTransform {
  transform(
    items: any[],
    searchText: string,
    fieldName: string,
    author: string
  ): any[] {
    if (!items) {
      return [];
    }
    if (!searchText) {
      return items;
    }
    searchText = searchText.toLowerCase();

    return items.filter((item) => {
      if (item && item[fieldName]) {
        return (
          item[fieldName].toLowerCase().includes(searchText) +
          item[author].toLowerCase().includes(searchText)
        );
      } else if (item && item[author]) {
        return (
          item[fieldName].toLowerCase().includes(searchText) +
          item[author].toLowerCase().includes(searchText)
        );
      }
      return false;
    });
  }
}
