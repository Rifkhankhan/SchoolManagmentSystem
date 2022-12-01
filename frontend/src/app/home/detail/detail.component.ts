import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  constructor(private route:ActivatedRoute) { }
  paraSub:Subscription = new Subscription()
  name:any = ''
  isLoading = false
  ngOnInit(): void {
    this.isLoading = true
    this.paraSub = this.route.paramMap.subscribe(paramMap=>{
      if(!paramMap.has('name')){
        console.log('there is a name');
        return
      }

      this.name = paramMap.get('name')

      this.isLoading = false
    })
  }

}
