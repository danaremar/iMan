import { DatePipe } from "@angular/common";
import { Injectable } from "@angular/core";
import { Link } from "src/app/models/gantt/gantt-link";
import { KanbanTask } from "src/app/models/kanban/kanbanTask";

@Injectable({
    providedIn: 'root'
})
export class GanttService {

    // GET GANTT TASKS
    getGanttTask(task: KanbanTask): any {
        return {
            id: task.id, text: task.title, start_date: this.getGanttDate(task.dueStartDate),
            duration: this.getDifferenceInDays(task.dueStartDate, task.dueEndDate),
            progress: task.computedTime <= task.estimatedTime ? (task.computedTime / task.estimatedTime) * 100 : (task.estimatedTime / task.computedTime) * 100,
            color: task.computedTime <= task.estimatedTime ? 'rgb(25,135,84)' : 'rgb(220,53,69)'
        }
    }

    getGanttTasks(tasks: Array<KanbanTask>): any {
        return tasks.map(x => this.getGanttTask(x)).filter(s => s)
    }

    // if null -> start the same day that sprint
    getGanttDate(date: Date): string {
        let datePipe = new DatePipe('en-US');
        if (date) {
            let strDate = datePipe.transform(date, 'dd-MM-yyyy')
            return strDate ? strDate : ''
        } else {
            let strTodayDate = datePipe.transform(new Date(), 'dd-MM-yyyy')
            return strTodayDate ? strTodayDate : ''
        }
    }

    getDifferenceInDays(start: Date, end: Date) {
        if (start && end) {
            const diffInMs = Math.abs((new Date(end)).getTime() - (new Date(start)).getTime());
            return diffInMs / (1000 * 60 * 60 * 24);
        } else {
            return 31
        }
    }

    // GET GANTT LINKS
    getGanttLinks(tasks: Array<KanbanTask>): any {
        let links: Array<Link> = []
        tasks.forEach(task => task.children.forEach(x => links.push(new Link(links.length, task.id, x.id, '0'))))
        return links
    }


}