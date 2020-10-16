import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DataService } from '../data.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  form: FormGroup;
  init_data: JSON;
  timeout;

  constructor(private fb: FormBuilder, private dS: DataService) { }

  updateLabels() {
    let set = document.querySelectorAll('input[type=text], input[type=email], textarea') as NodeListOf<HTMLInputElement>;
    set.forEach(function (item) {
      if (item.value !== "" && item.value !== null)
        item.parentElement.querySelector('label').classList.add('active');
      else
        item.parentElement.querySelector('label').classList.remove('active');
    });
  }

  ngOnInit(): void {

    this.form = this.fb.group({
      name: null,
      email: null,
      feedback: null,
      comment: null
    });

    this.getData();

    let set = document.querySelectorAll('input[type=text], input[type=email], textarea') as NodeListOf<HTMLInputElement>;

    set.forEach(function (item) {
      item.addEventListener('focus', function () {
        item.parentElement.querySelector('label').classList.add('active');
      });
      item.addEventListener('blur', function () {
        if (item.value == "")
          item.parentElement.querySelector('label').classList.remove('active');
      });
    })

    document.querySelectorAll('#container2 label').forEach(function (item) {
      item.addEventListener('click', function () {
        item.parentElement.querySelectorAll('label').forEach(function (item) {
          item.classList.remove('checked');
        });
        item.classList.add('checked');
      });
    })
  }

  getData(): void {
    this.dS.getData().subscribe(data => {
      this.updateLabels();
      this.init_data = data;
      this.form.setValue(data);

      let set = document.querySelectorAll('input[type=text], input[type=email], textarea') as NodeListOf<HTMLInputElement>;
      set.forEach(function (item) {
        if (item.value !== "" && item.value !== null)
          item.parentElement.querySelector('label').classList.add('active');
        else
          item.parentElement.querySelector('label').classList.remove('active');
      });
      let fb_active = data['feedback'];
      document.querySelectorAll('#container2 label').forEach(function (item) {
        item.classList.remove('checked');
        if (item.innerHTML === fb_active)
          item.classList.add('checked');
      });
    });
  }

  submitForm() {
    this.dS.postData(this.form.value).subscribe(
      data => this.success(),
      error => this.error()
    )
  }

  success() {
    let co = (document.getElementById('cover') as HTMLDivElement);
    let pu = (document.getElementById('success') as HTMLDivElement);

    co.querySelectorAll('.popup').forEach(function (item) {
      item.classList.remove('active');
    });

    co.style.display = "block";
    setTimeout(function () {
      co.classList.add('active');
      pu.classList.add('active');
    }, 100);

    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      pu.classList.remove('active');
      co.classList.remove('active');

      setTimeout(function () {
        co.style.display = 'none';
      }, 500)

      this.form.setValue(this.init_data);
      this.updateLabels();
      let fb_active = this.init_data['feedback'];
      document.querySelectorAll('#container2 label').forEach(function (item) {
        item.classList.remove('checked');
        if (item.innerHTML === fb_active)
          item.classList.add('checked');
      });
    }, 3000);

  }

  error() {
    let co = (document.getElementById('cover') as HTMLDivElement);
    let pu = (document.getElementById('error') as HTMLDivElement);

    co.querySelectorAll('.popup').forEach(function (item) {
      item.classList.remove('active');
    });

    co.style.display = "block";
    setTimeout(function () {
      co.classList.add('active');
      pu.classList.add('active');
    }, 100);

    clearTimeout(this.timeout);
    this.timeout = setTimeout(function () {
      pu.classList.remove('active');
      co.classList.remove('active');

      setTimeout(function () {
        co.style.display = 'none';
      }, 500)
    }, 3000);
  }

}
