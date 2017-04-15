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
            })),
            // transition('inactive => active', animate('.2s ease-in')),
            transition('active => inactive', animate('1s ease-out'))
        ]),
        trigger('fadeInOutTitle', [
            state('inactive', style({
                opacity: 0,
                display: 'none'
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
            'video': 'https://www.dropbox.com/s/mo6d4kdlklpn93e/Australia.mp4?dl=1'
        },
        {
            'name': 'Tokyo',
            'country': 'Japan',
            'continent': 'Asia',
            'tz': 'Asia/Tokyo',
            'video': 'https://www.dropbox.com/s/hd6tv8l7c6gv587/japan.mp4?dl=1'
        },
        {
            'name': 'Casablanca',
            'country': 'Morocco',
            'continent': 'Africa',
            'tz': 'Africa/Casablanca',
            'video': 'https://www.dropbox.com/s/4yut5v5uygv64kq/Morocco.mp4?dl=1'
        },
        {
            'name': 'Seoul',
            'country': 'Korea',
            'continent': 'Asia',
            'tz': 'Asia/Seoul',
            'video': 'https://www.dropbox.com/s/7uzwska08avq7tw/Korea.mp4?dl=1'
        },
        {
            'name': 'Hong Kong',
            'country': 'China',
            'continent': 'Asia',
            'tz': 'Asia/Hong_Kong',
            'video': 'https://www.dropbox.com/s/3z7wtnn294z0i7c/Hong%20Kong.mp4?dl=1'
        },
        {
            'name': 'Rio De Janeiro',
            'country': 'Brazil',
            'continent': 'America',
            'tz': 'America/Sao_Paulo',
            'video': 'https://www.dropbox.com/s/ifydm73umlmksl6/Brazil.mp4?dl=1'
        },
        {
            'name': 'Athens',
            'country': 'Greece',
            'continent': 'Europe',
            'tz': 'Europe/Athens',
            'video': 'https://www.dropbox.com/s/v6qezd8etw3eg4d/Greece.mp4?dl=1'
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
        this.currentSunset.time = moment().tz(this.currentSunset.tz).format('HH:mm') + ' LT';
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
