pipeline {
  options() {
    disableConcurrentBuilds()
  }
  agent any

  stages {

    stage('checkout') {
      steps {
        checkout scm
      }
    }

    stage('deploy') {
      steps {
        sh "./deploy.sh"
      }
    }
}
