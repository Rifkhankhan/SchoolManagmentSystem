import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, take, switchMap, tap, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {
  constructor(private http: HttpClient) {}

	private _teachers = new BehaviorSubject<[]>([]);
	private _courses = new BehaviorSubject<[]>([]);

	get getTeachers() {
		return this._teachers.asObservable();
	}

	createTeacher(
		name: string,
		age: number,
		gender: string,
		address: string,
		mobile: string,
		email: string,
		dob: string
	) {
		let newTeacher: any;

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
			.post<any>('http://localhost:3000/api/teacher/createTeacher', data)
			.pipe(
				take(1),
				switchMap(data => {
					console.log(data);

					newTeacher = data;
					return this.getTeachers;
				}),
				tap(teachers => {
					this._teachers.next(teachers.concat(newTeacher));
				})
			);
	}

	fetchTeachers() {
		return this.http
			.get<any>('http://localhost:3000/api/teacher/teachers')
			.pipe(
				take(1),
				map(resDate => {

					const teachers = [];

					for (let data of resDate.users) {
						teachers.push({
							id: data._id,
							name: data.name,
							email: data.email,
							mobile: data.mobile,
							gender: data.gender,
							dob: data.dob,
							address: data.address,
							age: data.age,
							image: data.image,
							teacherId: data.teacherId,
							grade: data.grade,
							courses: data.courses,
							exams: data.exams,
							active: data.active,
							fees: data.fees,
							teachers: data.teachers,
							parents: data.parents,
							password: data.password
						});
					}
					return teachers;
				}),
				tap(teachers => {
					this._teachers.next(teachers);
				})
			);
	}

	getTeacher(id: string) {
		return this.http
			.get<any>('http://localhost:3000/api/teacher/getTeacher/' + id)
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
						teacherId: data.teacherId,
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
			'http://localhost:3000/api/teacher/updatePassword',
			data
		);
	}

	// applyExam(
	// 	examId: string,
	// 	money: string,
	// 	userId: string,
	// 	event: string,
	// 	eventname: string
	// ) {
	// 	const data = {
	// 		examId,
	// 		money,
	// 		userId
	// 	};

	// 	let updatedTeachers: [];

	// 	return this.getTeachers.pipe(
	// 		take(1),
	// 		switchMap(teachers => {
	// 			if (!teachers || teachers.length <= 0) {
	// 				return this.fetchTeachers();
	// 			} else {
	// 				return of(teachers);
	// 			}
	// 		}),
	// 		switchMap(teachers => {
	// 			const updatedTeacherIndex = teachers.findIndex(p => p.id === userId);

	// 			updatedTeachers = [...teachers];
	// 			const oldTeacher = updatedTeachers[updatedTeacherIndex];

	// 			updatedTeachers[updatedTeacherIndex] = {
	// 				id: userId,
	// 				fees: [{ date: Date.now().toString(), money: money, event: examId }],
	// 				active: oldTeacher.active,
	// 				address: oldTeacher.address,
	// 				age: oldTeacher.age,
	// 				courses: oldTeacher.courses,
	// 				dob: oldTeacher.dob,
	// 				email: oldTeacher.email,
	// 				exams: oldTeacher.exams,
	// 				gender: oldTeacher.gender,
	// 				grade: oldTeacher.grade,
	// 				image: oldTeacher.image,
	// 				mobile: oldTeacher.mobile,
	// 				name: oldTeacher.name,
	// 				parents: oldTeacher.parents,
	// 				teacherId: oldTeacher.teacherId,
	// 				teachers: oldTeacher.teachers,
	// 				password: oldTeacher.password
	// 			};

	// 			return this.http.patch<any>(
	// 				'http://localhost:3000/api/teacher/applyExam',
	// 				data
	// 			);
	// 		}),
	// 		tap(() => {
	// 			this._teachers.next(updatedTeachers);
	// 		})
	// 	);
	// }

	// applyCourse(courseId: string, money: string, userId: string) {
	// 	const data = {
	// 		courseId,
	// 		money,
	// 		userId
	// 	};

	// 	let courses: any = [];
	// 	let teachers:any= [];
	// 	return this.http
	// 		.patch<any>('http://localhost:3000/api/teacher/applyCourse', data)
	// 		.pipe(
	// 			take(1),
	// 			switchMap(data => {
	// 				courses = data.courses;
	// 				teachers = data.teachers;
	// 				return this.getTeachers;
	// 			}),
	// 			tap(data => {
	// 				this._teachers.next(teachers);
	// 			}),
	// 			tap(data => {
	// 				this._courses.next(courses);
	// 			})
	// 		);
	// }

	// updateProfile(
	// 	userId: string,
	// 	email: string,
	// 	name: string,
	// 	address: string,
	// 	gender: string,
	// 	mobile: string,
  //   dob:string,
  //   age:number,
  //   courses:[],
  //   grade:string,
  //   parents:[]
	// ) {
	// 	let updatedTeachers: [];
	// 	let updateTeacherData: any;

	// 	const data = {
	// 		email,
	// 		name,
	// 		gender,
	// 		address,
	// 		mobile,
	// 		dob,
	// 		userId,
	// 		age,
	// 		courses,
	// 		grade,
	// 		parents
	// 	};

	// 	return this.http
	// 		.patch<any>('http://localhost:3000/api/teacher/applyProfile', data)
	// 		.pipe(
	// 			take(1),
	// 			switchMap(data => {
	// 				updateTeacherData = data;
	// 				return this.getTeachers;
	// 			}),
	// 			map(teachers => {
	// 				const updatedTeacherIndex = teachers.findIndex(
	// 					p => p.id === userId
	// 				);

	// 				updatedTeachers = [...teachers];

	// 				updatedTeachers[updatedTeacherIndex] = {
	// 					id: userId,
	// 					fees: updateTeacherData.fees,
	// 					active: updateTeacherData.active,
	// 					address: updateTeacherData.address,
	// 					age: updateTeacherData.age,
	// 					courses: updateTeacherData.courses,
	// 					dob: updateTeacherData.dob,
	// 					email: updateTeacherData.email,
	// 					exams: updateTeacherData.exams,
	// 					gender: updateTeacherData.gender,
	// 					grade: updateTeacherData.grade,
	// 					image: updateTeacherData.image,
	// 					mobile: updateTeacherData.mobile,
	// 					name: updateTeacherData.name,
	// 					parents: updateTeacherData.parents,
	// 					teacherId: updateTeacherData.teacherId,
	// 					teachers: updateTeacherData.teachers,
	// 					password: updateTeacherData.password
	// 				};

	// 				return updatedTeachers;
	// 			}),
	// 			tap(teachers => {
	// 				this._teachers.next(teachers);
	// 			})
	// 		);
	// }

	// uploadPhoto(userId: string, image: File) {
	// 	const formData = new FormData();

	// 	formData.append('userId', userId);
	// 	formData.append('image', image);

	// 	let updatedteachers: [];
	// 	let updateteacherData: any;

	// 	return this.http
	// 		.patch<any>('http://localhost:3000/api/teacher/applyExam', formData)
	// 		.pipe(
	// 			take(1),
	// 			switchMap(data => {
	// 				updateteacherData = data.user;
	// 				return this.getteachers;
	// 			}),
	// 			map(teachers => {
	// 				const updatedteacherIndex = teachers.findIndex(
	// 					p => p.id === updateteacherData.id
	// 				);

	// 				updatedteachers = [...teachers];
	// 				const oldteacher = updatedteachers[updatedteacherIndex];

	// 				updatedteachers[updatedteacherIndex] = {
	// 					id: userId,
	// 					fees: oldteacher.fees,
	// 					active: oldteacher.active,
	// 					address: oldteacher.address,
	// 					age: oldteacher.age,
	// 					courses: oldteacher.courses,
	// 					dob: oldteacher.dob,
	// 					email: oldteacher.email,
	// 					exams: oldteacher.exams,
	// 					gender: oldteacher.gender,
	// 					grade: oldteacher.grade,
	// 					image: updateteacherData.image,
	// 					mobile: oldteacher.mobile,
	// 					name: oldteacher.name,
	// 					parents: oldteacher.parents,
	// 					teacherId: oldteacher.teacherId,
	// 					teachers: oldteacher.teachers,
	// 					password: oldteacher.password
	// 				};

	// 				return updatedteachers;
	// 			}),
	// 			tap(teachers => {
	// 				this._teachers.next(teachers);
	// 			})
	// 		);
	// }

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
