import { Student } from './../Models/student.model';
import { BehaviorSubject, take, tap, switchMap, map, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class StudentService {
	constructor(private http: HttpClient) {}

	private _students = new BehaviorSubject<Student[]>([]);

	get getStudents() {
		return this._students.asObservable();
	}

	createStudent(
		name: string,
		age: number,
		gender: string,
		address: string,
		mobile: string,
		email: string,
		dob: string
	) {
		let newStudent: any;

		const data = {
			name,
			age,
			gender,
			address,
			mobile,
			email,
			dob
		};
		return this.http
			.post<any>('http://localhost:3000/api/student/createStudent', data)
			.pipe(
				take(1),
				switchMap(data => {
					console.log(data);

					newStudent = data;
					return this.getStudents;
				}),
				tap(students => {
					this._students.next(students.concat(newStudent));
				})
			);
	}

	fetchStudents() {
		return this.http
			.get<any>('http://localhost:3000/api/student/students')
			.pipe(
				take(1),
				map(resDate => {
					const students = [];

					for (let data of resDate) {
						students.push({
							id: data._id,
							name: data.name,
							email: data.email,
							mobile: data.mobile,
							gender: data.gender,
							dob: data.dob,
							address: data.address,
							age: data.age,
							image: data.image,
							studentId: data.studentId,
							grade: data.grade,
							courses: data.courses,
							exams: data.exams,
							active: data.active,
							fees: data.fees,
							teachers: data.teachers,
							parents: data.parents,
              password:data.password
						});
					}
					return students;
				}),
				tap(students => {
					this._students.next(students);
				})
			);
	}

	getStudent(id: string) {
		return this.http
			.get<any>('http://localhost:3000/api/student/getStudent/' + id)
			.pipe(
				take(1),
				map(data => {
					return {
						id: data._id,
						name: data.name,
						email: data.email,
						mobile: data.mobile,
						gender: data.gender,
						dob: data.dob,
						address: data.address,
						age: data.age,
						image: data.image,
						studentId: data.studentId,
						grade: data.grade,
						courses: data.courses,
						exams: data.exams,
						active: data.active,
						fees: data.fees,
						teachers: data.teachers,
						parents: data.parents
					};
				})
			);
	}

	updatePassword(id: string, currentPassword: string, newPassword: string) {
		const data = {
			currentPassword,
			newPassword,
			userId: id
		};

		return this.http.patch<any>(
			'http://localhost:3000/api/student/updatePassword',
			data
		);
	}

	applyExam( examId:string, money:string, userId:string) {

    const data = {
      examId,money,userId
    }

    // return this.http.patch
  }

	applyCourse() {}

	updateProfile() {}

	uploadPhoto() {}

	// cancelShop(shopId:string)
	// {
	//   return this.http.delete(`https://home-delivery-71528-default-rtdb.firebaseio.com/shops/${shopId}.json`).pipe(
	//     take(1),
	//     switchMap(()=>{
	//       return this.getAllShops;
	//     }),
	//     tap(shops=>{
	//       this._shops.next( shops.filter( p =>p.shopId !==shopId));
	//     })
	//   )
	// }
}
