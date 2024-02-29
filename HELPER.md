## Kullanılmayan kütüphaneleri tespit etmek için.

* Kütüphaneyi yükle.
```shell
npm install -g depcheck
```

* Sonra bunu projenin ana dizininde çalıştır.
```shell
depcheck
```

## Expo doctor.

* Bu tek başına otomatik olarak yapar. Alttakiler ile manuel yapılabilir.
```shell
npx expo-doctor
```

## Projeyi son expo versiyonuna yükseltmek için.

* Bu tek başına otomatik olarak yapar. Alttakiler ile manuel yapılabilir.
```shell
npx expo install --check
```

* Son expo versiyonunu yükle
```shell
npm install expo@latest
```

* Sonra diğer kütüphanelerin expo ile uyumlu versiyonlarını yükle.
```shell
npx expo install --fix
```

## Google Play'e yayınlamak için.

* Önce production build al.
```shell
eas build -p android -e production --auto-submit
```

* Sonra google play'e gönder.
```shell
eas submit -p android
```

## Build almak için.

* Eas kütüphanesini global olarak yükle.
```shell
npm install -g eas-cli
```

* Expo hesabına giriş yap.
```shell
eas login
```

* Apk build almak için çalıştır.
```shell
eas build -p android -e apk
```

## Developer Build almak için.

* Expo dev client kütüphanesini yükle.
```shell
npx expo install expo-dev-client
```

* App dosyasının en üstüne ekle.
```typescript
import 'expo-dev-client';
```

* Android'de userInterfaceStyle özelliğini aktif etmek için bu kütüphaneyi ekle.
```shell
npx expo install expo-system-ui
```

* Prebuild yap. (ios, android)
```shell
npx expo prebuild -p android
```

* android/gradle.properties dosyasına bu satırları ekle. JAVA_HOME bilgisayarda tanımlı ise üsttekine gerek yok. (Sadece android)
```
org.gradle.java.home=C:/Program Files/Java/jdk-17
org.gradle.daemon=true
```

* Local build oluştur. (Sadece anroid)
```shell
npx expo run:android
```

* Sonraki çalıştırmalarda bu şekilde çalıştır.
```shell
npx expo start --dev-client
```