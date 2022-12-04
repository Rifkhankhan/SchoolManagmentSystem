import { Student } from './../Models/student.model';
import { StudentService } from './../Services/student.service';
import { Subscription } from 'rxjs';
import {
	Component,
	OnInit,
	OnDestroy,
	ChangeDetectionStrategy
} from '@angular/core';
import { PostService } from '../Services/post.service';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit, OnDestroy {
	constructor(private studentService: StudentService) {}
	isLoading = false;
	postSub: Subscription = new Subscription();
	actionSub: Subscription = new Subscription();
	doSub: Subscription = new Subscription();

 
	ngOnInit() {
		this.isLoading = true;

  }

	ngOnDestroy(): void {
		if (this.postSub || this.actionSub || this.doSub) {
			this.postSub.unsubscribe();
			this.actionSub.unsubscribe();
			this.doSub.unsubscribe();
		}
	}
}
