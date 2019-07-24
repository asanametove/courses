import { Priority } from "./priority";

export class Queue {
    private priorityList = [Priority.High, Priority.Medium, Priority.Low];

    private lists: Object = {
        [Priority.Low]: [],
        [Priority.Medium]: [],
        [Priority.High]: [],
    }

    push(item: string, priority: Priority): void {
        const list = this.lists[priority];
        list.push(item);
    }

    pop(): void {
        let priorityIndex = 0;
        let list = this.getPriorityList(priorityIndex++);

        while(list && !list.length) {
            list = this.getPriorityList(priorityIndex++);
        }

        if (list) {
            list.pop();
        }
    }

    private getPriorityList(priorityIndex: number): string[] {
        const key = this.priorityList[priorityIndex];
        return key && this.lists[key]
            || null;
    }

    public [Symbol.iterator]() {
        let valueIndex = 0;
        let priorityIndex = 0;
        console.log('iterator');

        return {
            next: () => {
                console.log('iterator.next')
                let list = this.getPriorityList(priorityIndex);

                while(list) {
                    if (valueIndex < list.length) {
                        return {value: list[valueIndex++]};
                    } else {
                        valueIndex = 0;
                        list = this.getPriorityList(++priorityIndex);
                    }
                }

                return {done: true};
            }
        }
    }
}
