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
	private _courses = new BehaviorSubject<[]>([]);

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

					for (let data of resDate.users) {
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
							password: data.password
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

	applyExam(
		examId: string,
		money: string,
		userId: string,
		event: string,
		eventname: string
	) {
		const data = {
			examId,
			money,
			userId
		};

		let updatedStudents: Student[];

		return this.getStudents.pipe(
			take(1),
			switchMap(students => {
				if (!students || students.length <= 0) {
					return this.fetchStudents();
				} else {
					return of(students);
				}
			}),
			switchMap(students => {
				const updatedStudentIndex = students.findIndex(p => p.id === userId);

				updatedStudents = [...students];
				const oldStudent = updatedStudents[updatedStudentIndex];

				updatedStudents[updatedStudentIndex] = {
					id: userId,
					fees: [{ date: Date.now().toString(), money: money, event: examId }],
					active: oldStudent.active,
					address: oldStudent.address,
					age: oldStudent.age,
					courses: oldStudent.courses,
					dob: oldStudent.dob,
					email: oldStudent.email,
					exams: oldStudent.exams,
					gender: oldStudent.gender,
					grade: oldStudent.grade,
					image: oldStudent.image,
					mobile: oldStudent.mobile,
					name: oldStudent.name,
					parents: oldStudent.parents,
					studentId: oldStudent.studentId,
					teachers: oldStudent.teachers,
					password: oldStudent.password
				};

				return this.http.patch<any>(
					'http://localhost:3000/api/student/applyExam',
					data
				);
			}),
			tap(() => {
				this._students.next(updatedStudents);
			})
		);
	}

	applyCourse(courseId: string, money: string, userId: string) {
		const data = {
			courseId,
			money,
			userId
		};

		let courses: any = [];
		let students: Student[] = [];
		return this.http
			.patch<any>('http://localhost:3000/api/student/applyCourse', data)
			.pipe(
				take(1),
				switchMap(data => {
					courses = data.courses;
					students = data.students;
					return this.getStudents;
				}),
				tap(data => {
					this._students.next(students);
				}),
				tap(data => {
					this._courses.next(courses);
				})
			);
	}

	updateProfile(
		userId: string,
		email: string,
		name: string,
		address: string,
		gender: string,
		mobile: string,
    dob:string,
    age:number,
    courses:[],
    grade:string,
    parents:[]
	) {
		let updatedStudents: Student[];
		let updateStudentData: Student;

		const data = {
			email,
			name,
			gender,
			address,
			mobile,
			dob,
			userId,
			age,
			courses,
			grade,
			parents
		};

		return this.http
			.patch<any>('http://localhost:3000/api/student/applyProfile', data)
			.pipe(
				take(1),
				switchMap(data => {
					updateStudentData = data;
					return this.getStudents;
				}),
				map(students => {
					const updatedStudentIndex = students.findIndex(
						p => p.id === userId
					);

					updatedStudents = [...students];

					updatedStudents[updatedStudentIndex] = {
						id: userId,
						fees: updateStudentData.fees,
						active: updateStudentData.active,
						address: updateStudentData.address,
						age: updateStudentData.age,
						courses: updateStudentData.courses,
						dob: updateStudentData.dob,
						email: updateStudentData.email,
						exams: updateStudentData.exams,
						gender: updateStudentData.gender,
						grade: updateStudentData.grade,
						image: updateStudentData.image,
						mobile: updateStudentData.mobile,
						name: updateStudentData.name,
						parents: updateStudentData.parents,
						studentId: updateStudentData.studentId,
						teachers: updateStudentData.teachers,
						password: updateStudentData.password
					};

					return updatedStudents;
				}),
				tap(students => {
					this._students.next(students);
				})
			);
	}

	uploadPhoto(userId: string, image: File) {
		const formData = new FormData();

		formData.append('userId', userId);
		formData.append('image', image);

		let updatedStudents: Student[];
		let updateStudentData: Student;

		return this.http
			.patch<any>('http://localhost:3000/api/student/applyExam', formData)
			.pipe(
				take(1),
				switchMap(data => {
					updateStudentData = data.user;
					return this.getStudents;
				}),
				map(students => {
					const updatedStudentIndex = students.findIndex(
						p => p.id === updateStudentData.id
					);

					updatedStudents = [...students];
					const oldStudent = updatedStudents[updatedStudentIndex];

					updatedStudents[updatedStudentIndex] = {
						id: userId,
						fees: oldStudent.fees,
						active: oldStudent.active,
						address: oldStudent.address,
						age: oldStudent.age,
						courses: oldStudent.courses,
						dob: oldStudent.dob,
						email: oldStudent.email,
						exams: oldStudent.exams,
						gender: oldStudent.gender,
						grade: oldStudent.grade,
						image: updateStudentData.image,
						mobile: oldStudent.mobile,
						name: oldStudent.name,
						parents: oldStudent.parents,
						studentId: oldStudent.studentId,
						teachers: oldStudent.teachers,
						password: oldStudent.password
					};

					return updatedStudents;
				}),
				tap(students => {
					this._students.next(students);
				})
			);
	}

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
