import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'paginate',
    pure: true
})
export class PaginationPipe implements PipeTransform {
    transform(items: any, pageIdx: number, itemsPerPage: number, paginationTrigger: number = 0) {
        console.log("In pagination pipe", pageIdx, itemsPerPage, paginationTrigger)
        const startIdx = pageIdx * itemsPerPage
        const endIdx = startIdx + itemsPerPage
        return items.slice(startIdx, endIdx)
    }
}
