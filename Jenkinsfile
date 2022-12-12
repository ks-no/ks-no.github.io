pipeline {
  agent any
  options() { disableConcurrentBuilds() }
  tools { nodejs "node-LTS" }
  
  stages {
      stage('Initialize') {
      steps {
        script {
          sh 'printenv | sort'          
        }
      }
    }
    stage('install, build, deploy') {
      steps {
        sh "npm ci"
        sh "npm run build-static"
        sh "./bin/deploy.sh"
      }
    }
  }
}
