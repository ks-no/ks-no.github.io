pipeline {
  options() {
    disableConcurrentBuilds()
  }
  environment {
    HUGO_TOOL=tool(name: 'hugo')
  }
  agent any

  stages {



    stage('checkout') {
      steps {
        checkout scm
	      sh 'git submodule update --init'
      }
    }

    stage('check version') {
      steps {
        sh '$HUGO_TOOL/bin/hugo version'
      }
    }

    stage('deploy') {
      when{
        branch 'source'
      }
      steps {
	    sh "mkdir -p public && cd public && git remote set-url origin git@github-ks-no.github.io:ks-no/ks-no.github.io.git"
        sh "sh -x ./deploy.sh"
      }
    }
  }
}
