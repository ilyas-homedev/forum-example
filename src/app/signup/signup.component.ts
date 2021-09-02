import { Component, ElementRef, QueryList, ViewChildren, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { mustMatch } from '../_helpers/must-match.validator';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  signUpInfo: FormGroup;
  
  constructor(private formBuilder: FormBuilder) {
    this.signUpInfo = this.formBuilder.group({
      firstname: formBuilder.control('', [Validators.required, Validators.maxLength(30)]),
      lastname: formBuilder.control('', [Validators.required, Validators.maxLength(30)]),
      email: formBuilder.control('', [Validators.required, Validators.email]),
      password: formBuilder.control('', [Validators.required, Validators.minLength(7)]),
      passwordConfirmation: formBuilder.control('', [Validators.required])
    }, {
      validators: [mustMatch('password', 'passwordConfirmation')]
    })
  }

  @ViewChildren('label') labels: QueryList<ElementRef>
  @ViewChildren('input') inputs: QueryList<ElementRef>
  @ViewChild('secureIndicator') indicator: ElementRef
  @ViewChild('prompt') prompt: ElementRef

  control(name: string) {
    return this.signUpInfo.get(name);
  }

  goUp(event: any) {
    this.labels.forEach(label => {
      if (event.target.name === label.nativeElement.id) {
        label.nativeElement.classList.add('openInput');
        if (event.target.name === 'password') {
          this.indicator.nativeElement.style.display = "block";
        }
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
          if (event.target.name === 'password') {
            this.indicator.nativeElement.style.display = "none";
            this.indicator.nativeElement.style.left = "205px";
          }
        } else if (event.target.value.trim().length > 0) {
          label.nativeElement.childNodes[1].style.display = "none"
          if (event.target.name === 'password') {
            this.indicator.nativeElement.style.left = "130px";
          }
          event.target.classList.add('filledInput');
        }
      }
    })
  }

  inputIsEmpty(input: any) {
    if (input.nativeElement.value.length === 0) {
      return true;
    } else {
      return false;
    }
  }

  isSecurePassword(event: any) {
    const password = event.target.value;
    if (password.length === 0) {
      this.indicator.nativeElement.style.backgroundColor = '#e3e3e3';
    } else if (password.length < 7) {
      this.indicator.nativeElement.style.backgroundColor = '#bd0000';
    } else if (password.length < 11) {
      this.indicator.nativeElement.style.backgroundColor = '#c9a500';
    } else {
      this.indicator.nativeElement.style.backgroundColor = '#52bd00';
    }
  }

  onSubmit() {
    console.log(this.signUpInfo.value)
  }

  openPrompt() {
    this.prompt.nativeElement.style.display = 'block';
    this.labels.forEach(label => {
      this.inputs.forEach(input => {
        if (this.inputIsEmpty(input) && input.nativeElement.name === label.nativeElement.id) {
          label.nativeElement.childNodes[1].style.display = "inline";
        }
      })
    })
    setTimeout(() => {
      this.prompt.nativeElement.style.display = 'none';
    }, 4000)
  }
}
