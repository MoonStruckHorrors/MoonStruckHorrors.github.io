---
layout: post
title: "Maven - Bundle local JAR dependency within the target JAR"
date: 2019-03-20 18:00:00 +0700
categories: [technology, others]
tags: [java, maven, dependency, jar, local, system, scope]
---

Say you have two projects - `ProjectX` - which depends on `ProjectY` which is a local JAR. `ProjectY` is added as a dependency to `ProjectX` like this:

```xml
<dependency>
        <groupId>com.wow.projecty</groupId>
        <artifactId>projecty</artifactId>
        <version>1.0</version>
        <scope>system</scope>
        <systemPath>/Users/somepath/ProjectY.jar</systemPath>
</dependency>
```

Now if you want a self-sufficient JAR with all the dependencies bundled, you'd probably use the `maven-assembly-plugin` like this

```xml
<plugin>
    <artifactId>maven-assembly-plugin</artifactId>
    <configuration>
        <descriptorRefs>
            <descriptorRef>jar-with-dependencies</descriptorRef>
        </descriptorRefs>
        <archive>
            <manifest>
                <addClasspath>true</addClasspath>
                <mainClass>ProjectXDriver</mainClass>
            </manifest>
        </archive>
    </configuration>
    <executions>
        <execution>
            <id>make-assembly</id>
            <phase>package</phase>
            <goals>
                <goal>single</goal>
            </goals>
        </execution>
    </executions>
</plugin>
```

This would bundle all the dependencies, except the ones with a system scope - your local JARs.

To work around this issue, just install the JAR in the local maven repository and use it normally (without  system scope / systemPath).

```
mvn install:install-file -Dfile=ProjectY.jar -DpomFile=../pom.xml
```

*(Based on my unanswered question on StackOverflow)* 😅