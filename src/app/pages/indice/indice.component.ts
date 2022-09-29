import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ExpandedLTR, ExpandedRTL } from './animation';

@Component({
  selector: 'app-indice',
  templateUrl: './indice.component.html',
  styleUrls: ['./indice.component.css'],
  animations: [ExpandedRTL, ExpandedLTR]
})
export class IndiceComponent implements OnInit {

  selectedData = null;
  showHome = true;
  expandCollapseStatus: string = null;


  config = {
    paddingAtStart: true,
    interfaceWithRoute: true,
    collapseOnSelect: true,
    highlightOnSelect: true,
  };

  selectedItem(selectedData: any) {
    console.log(selectedData);
    this.selectedData = selectedData;
  }

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  appItems = [
    {
      label: 'Home',
      link: '/indice/home',
    },
    {
      label: 'FUNCIONALIDAD',
      link: '/indice/funcionalidad'
    },
    {
      label: 'APLICATIVO',
      link: '/indice/aplicativo',
      items: [
        {
          label: 'FRON END',
          link: '/indice/frontend'
        },
        {
          label: 'BACK END',
          link: '/indice/backend',
          items: [
            {
              label: 'BASE DE DATOS',
              link: '/indice/baseDatos',
              items: [
                {
                  label: 'Modelo Relacional',
                  link: '/indice/modeloRelacional'
                }
              ]
            }
          ]
        }
      ]
    }
  ];

  redirect(path: string) {
    window.location.href = path;
  }

  setExpandCollapseStatus(type: string) {
    this.expandCollapseStatus = type;
  }
  getClass(item: { faIcon: any; }) {
    return {
      [item.faIcon]: true
    };
  }

}
