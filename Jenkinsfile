pipeline {
  options() {
    disableConcurrentBuilds()
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
        script {
          sh 'hugo version'
        }
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
