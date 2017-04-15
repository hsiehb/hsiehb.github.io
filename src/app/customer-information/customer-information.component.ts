import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import * as moment from 'moment-timezone';
import {
    Input,
    trigger,
    state,
    style,
    animate,
    transition
} from '@angular/core';

@Component({
    selector: 'customer-info-page',
    templateUrl: './customer-information.component.pug',
    styleUrls: ['./customer-information.component.scss'],
    animations: [
        trigger('fadeInOutOverlay', [
            state('inactive', style({
                opacity: 0,
                transform: 'scale(1)'
            })),
            state('active',   style({
                opacity: .5,
                backgroundColor: 'black',
                transform: 'scale(1.1)'
            })),
            transition('inactive => active', animate('1s ease-in')),
            transition('active => inactive', animate('1s ease-out'))
        ]),
        trigger('fadeInOutTitle', [
            state('inactive', style({
                opacity: 0,
                color: 'blue',
            })),
            state('active',   style({
            })),
            transition('inactive => active', animate('1s ease-in')),
            transition('active => inactive', animate('1s ease-out'))
        ])
    ]
})
export class CustomerInformationComponent implements OnInit {
    mainTitle = {
        text: 'THE SUN IS ALWAYS SETTING SOMEWHERE',
        show: true
    };
    isOverlay: boolean = true;
    aboutText = CONSTANTS.ABOUT;
    displayAbout = false;
    displayTitle = true;
    displayNav = false;
    displayHome = true;
    loading;
    overlayState = 'active';
    titleState = 'active';
    sunsets = [
        {
            'name': 'Sydney',
            'country': 'Austrialia',
            'continent': 'Australia',
            'tz': 'Australia/Sydney',
            'video': 'https://www.dropbox.com/s/eghy0z9jowuot81/Australia%201.mov?dl=1'
        },
        {
            'name': 'Tokyo',
            'country': 'Japan',
            'continent': 'Asia',
            'tz': 'Asia/Tokyo',
            'video': 'https://www.dropbox.com/s/55njdj0cxpuoynr/japan%201.mov?dl=1'
        },
        {
            'name': 'Casablanca',
            'country': 'Morocco',
            'continent': 'Africa',
            'tz': 'Africa/Casablanca',
            'video': 'https://www.dropbox.com/s/t758ni6ztu3jg8a/Casa%20Blanca.mov?dl=1'
        },
        {
            'name': 'Seoul',
            'country': 'Korea',
            'continent': 'Asia',
            'tz': 'Asia/Seoul',
            'video': 'https://www.dropbox.com/s/cqk65c481eumyti/korea%201.mov?dl=1'
        },
        {
            'name': 'Hong Kong',
            'country': 'China',
            'continent': 'Asia',
            'tz': 'Asia/Hong_Kong',
            'video': 'https://www.dropbox.com/s/3vjf2jcijnbxd9j/Hong%20Kong.mov?dl=1'
        },
        {
            'name': 'Rio De Janeiro',
            'country': 'Brazil',
            'continent': 'America',
            'tz': 'America/Sao_Paulo',
            'video': 'https://www.dropbox.com/s/vrkip194c9ryemf/Brazil%201.mov?dl=1'
        },
        {
            'name': 'Athens',
            'country': 'Greece',
            'continent': 'Europe',
            'tz': 'Europe/Athens',
            'video': 'https://www.dropbox.com/s/aubrghfzm2opp4g/Greece.mov?dl=1'
        },

    ];
    currentSunset;

    constructor(
        private router: Router,
    ) { }

    ngOnInit(): void {
        let i = Math.floor(Math.random() * 7);

        this.loading = true;
        this.currentSunset = this.sunsets[i];
        this.currentSunset.name = `${this.currentSunset.name}, ${this.currentSunset.country}`;
        this.updateTime();
    }


    updateTime(): void {
        this.currentSunset.time = moment().tz(this.currentSunset.tz).format('h:mma z');
        setTimeout(this.updateTime.bind(this), 30000);
    }

    onClick(): void {
        this.isOverlay = false;
        this.overlayState = 'inactive';
        this.titleState = 'inactive';
        this.mainTitle.show = false;
        this.displayNav = true;
    }

    onAboutClick(): void {
        this.isOverlay = true;
        this.displayAbout = true;
        this.displayHome = false;
        this.overlayState = 'active';
    }

    onHomeClick(): void {
        this.isOverlay = false;
        this.displayAbout = false;
        this.displayHome = true;
        this.overlayState = 'inactive';
    }

    onLoadedData(): void {
        this.loading = false;
        console.log('video loaded');
    }


}
