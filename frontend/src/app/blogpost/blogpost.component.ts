import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-blogpost',
  templateUrl: './blogpost.component.html',
  styleUrls: ['./blogpost.component.css']
})
export class BlogpostComponent implements OnInit {

  title: string;
  description: string;
  text: string;

  constructor() { }

  ngOnInit() {
    this.title = 'Getting Started With Plone Testing'
    this.description = 'bobtemplates.plone is a package skeleton generator that gives you an easy start with Plone testing.';
    this.text = '<p>The Plone Testing & Continuous Integration team worked hard over the last few months setting up an a new Continuous Integration (CI) infrastructure for Plone. Yesterday we were able to finally go live with our new system on jenkins.plone.org.</p><p>Gil Forcada, Ramon Navarro Bosch and I moved our Jenkins master server to a new and more powerful machine. We are using a distributed CI system with a Jenkins server, to collect and serve the test results, and a few nodes that actually run the tests. This allows us to easily scale our CI infrastructure and makes sure the Jenkins web interface is always responsive, even though the nodes are under heavy load. For the server setup we are using Ansible, a Python-based Open Source provisioning system. We are now able to automatically generate our entire CI infrastructure, including the Jenkins master, all nodes and our custom middleware component (mr.roboto) with those two Ansible playbooks: In order to allow other people to re-use our work, we factored out the generic parts of the configuration into two Ansible playbooks.</p>';
  }

}
