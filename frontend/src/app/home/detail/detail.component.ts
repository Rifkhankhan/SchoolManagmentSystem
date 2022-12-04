import { TeacherService } from './../../Services/teacher.service';
import { Student } from './../../Models/student.model';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { StudentService } from 'src/app/Services/student.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit,OnDestroy {

  constructor(private route:ActivatedRoute,
    private studentService:StudentService,
    private teacherService:TeacherService) { }
  paraSub:Subscription = new Subscription()
  studentSub:Subscription = new Subscription()
  students!:Student[];
  name:any = ''
  isLoading = false
  ngOnInit(): void {
    this.isLoading = true
    this.paraSub = this.route.paramMap.subscribe(paramMap=>{
      if(!paramMap.has('name')){
        console.log('there is no name');
        return
      }

      this.name = paramMap.get('name')

      if(paramMap.get('name') === 'students'){
        this.studentSub = this.studentService.fetchStudents().subscribe(students=>{
          this.students = students
          console.log(students);

          this.isLoading = false
        })
      }
      // else if(paramMap.get('name') === 'teachers'){
      //   this.studentSub = this.teacherService..subscribe(students=>{
      //     this.students = students
      //     console.log(students);

      //     this.isLoading = false
      //   })
      // }
    })
  }


  ngOnDestroy(): void {
      if(this.paraSub ||this.studentSub)
      {
        this.paraSub.unsubscribe();
        this.studentSub.unsubscribe();
      }
  }
}
