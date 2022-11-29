pipeline {
  options() {
    disableConcurrentBuilds()
  }

  tools {
    nodejs "node-LTS"
  }
  
  agent any

  stages {
    stage('install, build, deploy') {
      steps {
        sh "npm ci"
        sh "npm run build-static"
        sh "./bin/deploy.sh"
      }
    }
  }
}
