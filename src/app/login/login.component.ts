import { Component, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginInfo: FormGroup
  constructor(private formBuilder: FormBuilder) {
    this.loginInfo = this.formBuilder.group({
      email: formBuilder.control('', [Validators.required, Validators.email]),
      password: formBuilder.control('', [Validators.required])
    })
  }

  @ViewChildren('label') labels: QueryList<ElementRef>
  @ViewChildren('input') inputs: QueryList<ElementRef>

  goUp(event: any) {
    this.labels.forEach(label => {
      if (event.target.name === label.nativeElement.id) {
        label.nativeElement.classList.add('openInput');
      }
    })
  }

  goDown(event: any) {
    this.labels.forEach(label => {
      if (event.target.name === label.nativeElement.id) {
        label.nativeElement.childNodes[1].style.display = "inline"
        if (event.target.value.trim().length === 0) {

          label.nativeElement.classList.remove('openInput');

          event.target.value = '';
          event.target.classList.remove('filledInput');
          
        } else if (event.target.value.trim().length > 0) {
          label.nativeElement.childNodes[1].style.display = "none"
          
          event.target.classList.add('filledInput');
        }
      }
    })
  }

  onSubmit() {
    console.log(this.loginInfo.value);
  }

  inputIsEmpty(input: any) {
    if (input.nativeElement.value.length === 0) {
      return true;
    } else {
      return false;
    }
  }

  openPrompt() {
    this.labels.forEach(label => {
      this.inputs.forEach(input => {
        if (this.inputIsEmpty(input) && input.nativeElement.name === label.nativeElement.id) {
          label.nativeElement.childNodes[1].style.display = "inline";
        }
      })
    })
  }
  
}
