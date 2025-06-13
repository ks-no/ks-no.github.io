pipeline {
  options() {
    disableConcurrentBuilds()
    buildDiscarder(logRotator(numToKeepStr: '40', artifactNumToKeepStr: '40'))
  }
  agent {
    label 'linux || linux-large'
  }

  stages {



    stage('checkout') {
      steps {
        checkout scm
	      sh 'git submodule update --init'
      }
    }

    stage('generate CSV from Open API specs') {
      when {
        branch 'source'
      }
      steps {
        script {
          sh '''
	  if git show-ref --verify --quiet refs/heads/source; then
            git checkout source
          else
            git checkout -b source
          fi
	  git pull --rebase
          '''
        }
	sh './generate-specs-csv.sh'
        script {
          sh '''
          git add static/api/specs.csv
          git commit -m "Update specs.csv after generation" || echo "ingen endringer"
          git push -u origin source
          '''
        }
      }
    }

    stage('check version') {
      steps {
        script {
          sh 'hugo version'
        }
      }
    }
    stage('build') {
      steps {
        sh 'hugo --cleanDestinationDir '
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
