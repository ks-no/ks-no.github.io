pipeline {
  options() {
    disableConcurrentBuilds()
  }
  agent any

  stages {

    stage('check version') {
      steps {
        script {
           sh 'which hugo'
            sh 'hugo version'
        }
      }
    }

    stage('checkout') {
      steps {
        checkout scm
	sh 'git submodule update --init'
      }
    }h

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
