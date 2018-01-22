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

    stage('deploy') {
      steps {
        sh "./deploy.sh"
      }
    }
  }
}
