import { Component } from '@angular/core';

@Component({
  selector: 'app-coursesection',
  standalone: false,
  
  templateUrl: './coursesection.component.html',
  styleUrl: './coursesection.component.css'
})
export class CoursesectionComponent {
  courses = [
    ['React', 'A widely-used JavaScript library developed by Facebook in 2011.'],
    ['Angular', `A framework created by Google for building single-page applications (SPAs).`],
    ['Svelte', 'A lightweight framework that compiles your code to optimized JavaScript at build time.'],
    ['Vue.js', 'A progressive framework for building UIs. Vue.js is easy to integrate into projects.'],
    ['Node.js', 'A JavaScript runtime built on Chrome’s V8 engine for building fast, scalable backends. '],
    ['Python', 'A versatile and beginner-friendly language used in web development, data science, automation, and more.']
  ];
}
