import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { AuthenticationService } from 'src/app/services/authentication.service';

export function passwordsMatchValidator():ValidatorFn{
  return (control:AbstractControl):ValidationErrors|null=>{
    const password =control.get('password')?.value;
    const confirmPassword=control.get('confirmPassword')?.value

    if(password&&confirmPassword&& password!==confirmPassword){
      return{
        passwordDontMatch:true
      }
    }

    return null;
  }
}

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {

  constructor(private auth:AuthenticationService,private toast:HotToastService, private router:Router){

  }

  signUpForm= new FormGroup({
    name: new FormControl('',[Validators.required]),
    email: new FormControl('',[Validators.email,Validators.required]),
    password:new FormControl('',[Validators.required]),
    confirmPassword:new FormControl('',Validators.required),
  },{validators:passwordsMatchValidator()})

  get name(){
    return this.signUpForm.get('name')
  }

  get email(){
    return this.signUpForm.get('email')
  }

  get password(){
    return this.signUpForm.get('password')
  }

  get confirmPassword(){
    return this.signUpForm.get('confirmPassword')
  }

  signUp(){
    const { name, email, password}=this.signUpForm.value;

    if(!this.signUpForm.valid||!name||!email||!password) return;
    this.auth.signUp(name,email,password).pipe(
      this.toast.observe({
        success:'Signed Up',
        loading:'Signing in',
        error:({message})=>`${message}`
      })
    ).subscribe(()=>{
      this.router.navigate(['/home']);
    })
  }

}
